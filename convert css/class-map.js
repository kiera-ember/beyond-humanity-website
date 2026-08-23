// class-map.js
//
// Complete class map generated from input.css.
//
// - Known semantic names are preserved in `semanticOverrides`.
// - Every other class selector in input.css receives a deterministic,
//   collision-safe generated name automatically.
// - Re-run the CSS generator after updating input.css.
//
// This module expects input.css to be in the same directory.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
const inputCssPath = path.join(moduleDirectory, "input.css");

/**
 * Explicit semantic overrides.
 *
 * These names are intentionally stable and should be preferred for
 * important application, viewer, dialog, toolbar, and GM3 components.
 */
const semanticOverrides = {
  // Core legacy viewer / overlay
  "ndfHFb-c4YZDc": "legacy-overlay",
  "ndfHFb-c4YZDc-uoC0bf": "is-dark-legacy-overlay",
  "ndfHFb-c4YZDc-i5oIFb": "uses-modern-overlay-style",
  "ndfHFb-c4YZDc-e1YmVc": "is-light-legacy-overlay",
  "ndfHFb-c4YZDc-N4imRe": "hide-overlay-scrollbar",
  "ndfHFb-c4YZDc-Sx9Kwc": "legacy-overlay-dialog",
  "ndfHFb-c4YZDc-Sx9Kwc-r4nke": "legacy-overlay-dialog-title",
  "ndfHFb-c4YZDc-Sx9Kwc-bN97Pc": "legacy-overlay-dialog-content",
  "ndfHFb-c4YZDc-Sx9Kwc-c6xFrd": "legacy-overlay-dialog-actions",

  // Shared legacy interaction states
  "RDPZE": "is-disabled",
  "u3bW4e": "is-focused",
  "qs41qe": "is-activated",
  "ZmdkE": "is-hovered",
  "XpnDCe": "is-focused-state",
  "auswjd": "is-pressed",
  "OWB6Me": "is-disabled-state",
  "L6cTce": "is-hidden",
  "gk6SMd": "is-selected",
  "sn54Q": "is-active",
  "haAclf": "container",
  "bN97Pc": "content",
  "r4nke": "title",
  "c6xFrd": "actions",
  "Bz112c": "icon",
  "LgbsSe": "button",

  // Legacy buttons and tooltips
  "tk3N6e-LgbsSe": "legacy-button",
  "tk3N6e-LgbsSe-JIbuQc": "legacy-primary-button",
  "tk3N6e-LgbsSe-ZmdkE": "is-legacy-button-hovered",
  "tk3N6e-LgbsSe-auswjd": "is-legacy-button-pressed",
  "tk3N6e-LgbsSe-OWB6Me": "is-legacy-button-disabled",
  "tk3N6e-suEOdc": "legacy-tooltip",
  "tk3N6e-suEOdc-ZYIfFd": "is-tooltip-hidden",

  // Legacy menus
  "VIpgJd-xl07Ob": "legacy-menu-surface",
  "VIpgJd-j7LFlb": "legacy-menu-item",
  "VIpgJd-j7LFlb-ZmdkE": "is-menu-item-hovered",
  "VIpgJd-j7LFlb-sn54Q": "is-menu-item-selected",
  "VIpgJd-j7LFlb-OWB6Me": "is-menu-item-disabled",
  "VIpgJd-j7LFlb-bN97Pc": "legacy-menu-item-content",

  // Themes
  "XV0XSd": "docs-theme",
  "vhoiae": "material-docs-theme",
  "KkxPLb": "is-light-docs-theme",
  "LgGVmb": "is-dark-docs-theme",
  "TOb6Ze": "docs-modern-theme",
  "X9XeLb": "drive-modern-theme",
  "aJfoSc": "workspace-modern-theme",
  "cWKK1c": "google-modern-theme",
  "yYWAMb": "viewer-theme-surface",
  "RiZsyf": "is-dark-gm3-theme",
  "YP1I1b": "is-dark-gm3-theme",
  "Qv2Ltf": "picker-rich-text-preview",
  "GEKsvf": "picker-dark-code-preview",

  // Viewer controls
  "ndfHFb-c4YZDc-LgbsSe": "legacy-overlay-button",
  "ndfHFb-c4YZDc-LgbsSe-ZmdkE": "is-legacy-overlay-button-hovered",
  "ndfHFb-c4YZDc-LgbsSe-XpnDCe": "is-legacy-overlay-button-focused",
  "ndfHFb-c4YZDc-LgbsSe-auswjd": "is-legacy-overlay-button-pressed",
  "ndfHFb-c4YZDc-LgbsSe-OWB6Me": "is-legacy-overlay-button-disabled",
  "ndfHFb-c4YZDc-to915-LgbsSe": "viewer-toolbar-button",
  "ndfHFb-c4YZDc-Qs0SX-LgbsSe": "viewer-toolbar-inline-button",
  "ndfHFb-c4YZDc-Wrql6b": "viewer-toolbar",
  "ndfHFb-c4YZDc-Wrql6b-LQLjdd": "viewer-toolbar-actions",
  "ndfHFb-c4YZDc-C7uZwb-LgbsSe": "viewer-icon-button",
  "ndfHFb-c4YZDc-C7uZwb-LgbsSe-Bz112c": "viewer-icon-button-icon",

  // Viewer side panel
  "ndfHFb-c4YZDc-MZArnb-b0t70b": "viewer-side-panel",
  "ndfHFb-c4YZDc-MZArnb-b0t70b-haAclf": "viewer-side-panel-surface",
  "ndfHFb-c4YZDc-MZArnb-b0t70b-L6cTce": "is-viewer-side-panel-hidden",
  "ndfHFb-c4YZDc-MZArnb-tJHJj": "viewer-side-panel-header",
  "ndfHFb-c4YZDc-MZArnb-bN97Pc": "viewer-side-panel-content",
  "ndfHFb-c4YZDc-MZArnb-AznF2e": "viewer-side-panel-tab",

  // Viewer canvas and document surfaces
  "ndfHFb-c4YZDc-cYSp0e": "viewer-document-canvas",
  "ndfHFb-c4YZDc-cYSp0e-s2gQvd": "viewer-document-scroll-area",
  "ndfHFb-c4YZDc-cYSp0e-Oz6c3e": "viewer-document-page-container",
  "ndfHFb-c4YZDc-cYSp0e-hpYHOb": "viewer-document-page",
  "ndfHFb-c4YZDc-cYSp0e-DARUcf": "viewer-page-layer",
  "ndfHFb-c4YZDc-HiaYvf": "viewer-image-canvas",
  "ndfHFb-c4YZDc-HiaYvf-s2gQvd": "viewer-image-canvas-scroll-area",
  "ndfHFb-c4YZDc-fmcmS": "viewer-text-layer",
  "ndfHFb-c4YZDc-fmcmS-s2gQvd": "viewer-text-scroll-area",

  // Modern GM3 controls
  "mUIrbf-LgbsSe": "gm3-text-button",
  "mUIrbf-vQzf8d": "gm3-text-button-label",
  "UywwFc-LgbsSe": "gm3-filled-button",
  "UywwFc-vQzf8d": "gm3-filled-button-label",
  "AeBiU-LgbsSe": "gm3-outlined-button",
  "AeBiU-vQzf8d": "gm3-outlined-button-label",
  "pYTkkf-Bz112c-LgbsSe": "gm3-icon-button",
  "VYBDae-Bz112c-LgbsSe": "gm3-filled-icon-button",
  "wX4xVc-Bz112c-LgbsSe": "gm3-tonal-icon-button",
  "KGC9Kd-MPu53c": "gm3-checkbox",
  "KGC9Kd-muHVFf-bMcfAe": "gm3-checkbox-input",
  "GhEnC-GCYh9b": "gm3-radio",
  "GhEnC-gBXA9-bMcfAe": "gm3-radio-input",
  "aqdrmf-rymPhb": "gm3-list",
  "aqdrmf-rymPhb-ibnC6b": "gm3-list-item",
  "ne2Ple-suEOdc": "gm3-tooltip",
  "ne2Ple-z59Tgd": "gm3-tooltip-content",

  // Material fields and cards
  "VfPpkd-WsjYwc": "material-card",
  "VfPpkd-EScbFb-JIbuQc": "material-card-action",
  "VfPpkd-fmcmS-yrriRe": "material-text-field",
  "VfPpkd-fmcmS-wGMbrd": "material-text-field-input",
  "VfPpkd-NLUYnc-V67aGc": "material-text-field-label",
  "VfPpkd-RWgCYc-ksKsZd": "material-text-field-line",
  "VfPpkd-NSFCdd-i5vt6e": "material-outlined-field-outline",

  // Application and picker overlays
  "Chn84b-haAclf": "application-overlay",
  "Chn84b-L5Fo6c-haAclf": "application-overlay-surface",
  "Chn84b-o1DAbe-ge6pde-haAclf-Lb81de": "picker-dialog-overlay",
  "Chn84b-o1DAbe-ge6pde-Sx9Kwc-Lb81de": "picker-dialog",
  "Chn84b-o1DAbe-ge6pde-fmcmS-Lb81de": "picker-dialog-title",
  "Chn84b-o1DAbe-ge6pde-TvD9Pc-LgbsSe": "picker-dialog-close-button",
  "oErxNe-pSzOP": "picker-loading-spinner",
  "ja0jmf": "picker-loading-screen",
  "F6wkof": "picker-loading-skeleton",
};

/**
 * Converts an original obfuscated class name into a readable safe CSS name.
 */
function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/_/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

/**
 * Small deterministic hash used to make generated class names collision-safe.
 */
function hashClassName(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

/**
 * Extract class identifiers from normal CSS selectors.
 *
 * The supplied CSS uses standard non-escaped class names, so this covers
 * all selectors in the consolidated stylesheet while avoiding decimal values,
 * such as `.5`, because identifiers must begin with a letter, `_`, or `-`.
 */
function extractClassNames(css) {
  const classNames = new Set();

  const classSelectorPattern =
    /(^|[^a-zA-Z0-9_-])\.(-?[_a-zA-Z][a-zA-Z0-9_-]*)/g;

  let match;

  while ((match = classSelectorPattern.exec(css)) !== null) {
    classNames.add(match[2]);
  }

  return [...classNames].sort((left, right) =>
    left.localeCompare(right),
  );
}

function createGeneratedName(originalClassName) {
  const readablePart = toKebabCase(originalClassName) || "class";
  const hash = hashClassName(originalClassName);

  return `css-${readablePart}-${hash}`;
}

function createClassMap() {
  const css = fs.readFileSync(inputCssPath, "utf8");
  const classNames = extractClassNames(css);
  const map = Object.create(null);

  for (const className of classNames) {
    map[className] =
      semanticOverrides[className] ?? createGeneratedName(className);
  }

  return Object.freeze(map);
}

const classMap = createClassMap();

export { classMap, semanticOverrides };
export default classMap;