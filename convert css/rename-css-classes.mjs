// rename-css-classes.mjs
//
// Usage:
//   node rename-css-classes.mjs
//   node rename-css-classes.mjs input.css renamed.css
//
// Reads CSS from input.css, renames class selectors using class-map.js,
// and writes the transformed CSS to renamed.css.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import classMap from "./class-map.js";

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));

const [, , inputArgument = "input.css", outputArgument = "renamed.css"] =
  process.argv;

const inputPath = path.resolve(moduleDirectory, inputArgument);
const outputPath = path.resolve(moduleDirectory, outputArgument);

const nestedRuleAtRules = new Set([
  "container",
  "document",
  "layer",
  "media",
  "scope",
  "starting-style",
  "supports",
]);

const keyframeAtRules = new Set([
  "keyframes",
  "-moz-keyframes",
  "-o-keyframes",
  "-webkit-keyframes",
]);

function isIdentifierStart(character) {
  return (
    character === "_" ||
    character === "-" ||
    /[A-Za-z]/.test(character)
  );
}

function isIdentifierCharacter(character) {
  return (
    character === "_" ||
    character === "-" ||
    /[A-Za-z0-9]/.test(character)
  );
}

function isWhitespace(character) {
  return /\s/.test(character);
}

function readComment(css, startIndex) {
  const endIndex = css.indexOf("*/", startIndex + 2);

  return endIndex === -1 ? css.length : endIndex + 2;
}

function readString(css, startIndex) {
  const quote = css[startIndex];
  let index = startIndex + 1;

  while (index < css.length) {
    if (css[index] === "\\") {
      index += 2;
      continue;
    }

    if (css[index] === quote) {
      return index + 1;
    }

    index += 1;
  }

  return css.length;
}

function readCssIdentifier(css, startIndex) {
  let index = startIndex;

  while (index < css.length) {
    const character = css[index];

    if (character === "\\") {
      index += 1;

      while (
        index < css.length &&
        /[0-9A-Fa-f]/.test(css[index]) &&
        index - startIndex <= 7
      ) {
        index += 1;
      }

      if (isWhitespace(css[index])) {
        index += 1;
      }

      continue;
    }

    if (!isIdentifierCharacter(character)) {
      break;
    }

    index += 1;
  }

  return index;
}

/**
 * Replaces class selectors in selector text only.
 *
 * Examples:
 *   .abc               -> .semantic-name
 *   .abc.def           -> .semantic-name.other-name
 *   :not(.abc)         -> :not(.semantic-name)
 *   .abc:hover         -> .semantic-name:hover
 *
 * CSS property declarations are never sent to this function.
 */
function renameClassesInSelector(selectorText) {
  let output = "";
  let index = 0;

  while (index < selectorText.length) {
    const character = selectorText[index];

    if (character === "/" && selectorText[index + 1] === "*") {
      const endIndex = readComment(selectorText, index);
      output += selectorText.slice(index, endIndex);
      index = endIndex;
      continue;
    }

    if (character === "'" || character === '"') {
      const endIndex = readString(selectorText, index);
      output += selectorText.slice(index, endIndex);
      index = endIndex;
      continue;
    }

    if (
      character === "." &&
      isIdentifierStart(selectorText[index + 1] ?? "")
    ) {
      const identifierStart = index + 1;
      const identifierEnd = readCssIdentifier(selectorText, identifierStart);
      const originalClassName = selectorText.slice(
        identifierStart,
        identifierEnd,
      );

      const renamedClassName = classMap[originalClassName];

      if (renamedClassName) {
        output += `.${renamedClassName}`;
      } else {
        output += `.${originalClassName}`;
      }

      index = identifierEnd;
      continue;
    }

    output += character;
    index += 1;
  }

  return output;
}

function getAtRuleName(prelude) {
  const match = /^\s*@([A-Za-z_-][A-Za-z0-9_-]*)/.exec(prelude);

  return match ? match[1].toLowerCase() : null;
}

/**
 * Reads CSS from `startIndex` through the next top-level:
 *   - opening brace {
 *   - closing brace }
 *   - semicolon ;
 *
 * Strings, comments, attribute selectors, and function parentheses are
 * ignored while finding the delimiter.
 */
function readRulePrelude(css, startIndex) {
  let index = startIndex;
  let parenthesisDepth = 0;
  let bracketDepth = 0;

  while (index < css.length) {
    const character = css[index];

    if (character === "/" && css[index + 1] === "*") {
      index = readComment(css, index);
      continue;
    }

    if (character === "'" || character === '"') {
      index = readString(css, index);
      continue;
    }

    if (character === "(") {
      parenthesisDepth += 1;
      index += 1;
      continue;
    }

    if (character === ")") {
      parenthesisDepth = Math.max(0, parenthesisDepth - 1);
      index += 1;
      continue;
    }

    if (character === "[") {
      bracketDepth += 1;
      index += 1;
      continue;
    }

    if (character === "]") {
      bracketDepth = Math.max(0, bracketDepth - 1);
      index += 1;
      continue;
    }

    if (
      parenthesisDepth === 0 &&
      bracketDepth === 0 &&
      (character === "{" || character === "}" || character === ";")
    ) {
      return {
        prelude: css.slice(startIndex, index),
        delimiter: character,
        delimiterIndex: index,
      };
    }

    index += 1;
  }

  return {
    prelude: css.slice(startIndex),
    delimiter: null,
    delimiterIndex: css.length,
  };
}

/**
 * Finds the matching `}` for an opening `{`.
 */
function findMatchingBrace(css, openingBraceIndex) {
  let depth = 1;
  let index = openingBraceIndex + 1;

  while (index < css.length) {
    const character = css[index];

    if (character === "/" && css[index + 1] === "*") {
      index = readComment(css, index);
      continue;
    }

    if (character === "'" || character === '"') {
      index = readString(css, index);
      continue;
    }

    if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }

    index += 1;
  }

  return css.length - 1;
}

/**
 * Determines whether an at-rule contains nested CSS rules.
 */
function isNestedRuleAtRule(atRuleName) {
  return nestedRuleAtRules.has(atRuleName);
}

/**
 * Determines whether an at-rule is a keyframe rule.
 *
 * Keyframe blocks contain percentage selectors such as `0%`, `50%`, and
 * `to`, which should not be class-renamed.
 */
function isKeyframeAtRule(atRuleName) {
  return keyframeAtRules.has(atRuleName);
}

/**
 * Processes CSS rule blocks.
 *
 * `renameSelectors` is false inside @keyframes bodies because those bodies
 * contain keyframe-step selectors rather than normal CSS selectors.
 */
function transformRules(css, renameSelectors = true) {
  let output = "";
  let index = 0;

  while (index < css.length) {
    if (css[index] === "/" && css[index + 1] === "*") {
      const endIndex = readComment(css, index);
      output += css.slice(index, endIndex);
      index = endIndex;
      continue;
    }

    if (css[index] === "}") {
      output += "}";
      index += 1;
      continue;
    }

    const rule = readRulePrelude(css, index);

    if (rule.delimiter === null) {
      output += rule.prelude;
      break;
    }

    if (rule.delimiter === "}") {
      output += rule.prelude;
      index = rule.delimiterIndex;
      continue;
    }

    if (rule.delimiter === ";") {
      output += rule.prelude;
      output += ";";
      index = rule.delimiterIndex + 1;
      continue;
    }

    const originalPrelude = rule.prelude;
    const atRuleName = getAtRuleName(originalPrelude);

    const transformedPrelude =
      renameSelectors && !atRuleName
        ? renameClassesInSelector(originalPrelude)
        : originalPrelude;

    const openingBraceIndex = rule.delimiterIndex;
    const closingBraceIndex = findMatchingBrace(css, openingBraceIndex);
    const blockContent = css.slice(openingBraceIndex + 1, closingBraceIndex);

    output += transformedPrelude;
    output += "{";

    if (atRuleName && isNestedRuleAtRule(atRuleName)) {
      output += transformRules(blockContent, renameSelectors);
    } else if (atRuleName && isKeyframeAtRule(atRuleName)) {
      output += transformRules(blockContent, false);
    } else {
      // Standard style rules contain declarations. Do not transform
      // declaration values, URLs, custom properties, or animation values.
      output += blockContent;
    }

    output += "}";

    index = closingBraceIndex + 1;
  }

  return output;
}

function countMappedClasses(css) {
  let count = 0;

  for (const originalClassName of Object.keys(classMap)) {
    const pattern = new RegExp(
      `(^|[^A-Za-z0-9_-])\\.${originalClassName.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      )}(?![A-Za-z0-9_-])`,
      "g",
    );

    const matches = css.match(pattern);

    if (matches) {
      count += matches.length;
    }
  }

  return count;
}

async function main() {
  const inputCss = await fs.readFile(inputPath, "utf8");
  const renamedCss = transformRules(inputCss);

  const outputDirectory = path.dirname(outputPath);
  await fs.mkdir(outputDirectory, { recursive: true });

  const temporaryOutputPath = `${outputPath}.tmp`;

  await fs.writeFile(temporaryOutputPath, renamedCss, "utf8");
  await fs.rename(temporaryOutputPath, outputPath);

  const replacementCount = countMappedClasses(inputCss);

  console.log(`Input CSS: ${inputPath}`);
  console.log(`Output CSS: ${outputPath}`);
  console.log(`Mapped classes available: ${Object.keys(classMap).length}`);
  console.log(`Class selector occurrences detected: ${replacementCount}`);
}

main().catch((error) => {
  console.error("\nCSS class renaming failed:");
  console.error(error);
  process.exitCode = 1;
});