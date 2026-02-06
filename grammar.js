/**
 * @file stupid kee lsp
 * @author jmkl
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({

  name: 'kee',

  extras: $ => [/\s/],

  rules: {
    source_file: $ => repeat($.statement),

    statement: $ => seq(
      field("keybind", $.keybind),
      "=",
      field("action", $.action)
    ),

    keybind: _ => /[A-Za-z0-9\-]+/,

    action: $ => seq(
      $.namespace,
      "::",
      $.identifier,
      optional($.args)
    ),

    namespace: _ => /[a-z]+/,
    identifier: _ => /[A-Z_]+/,

    args: $ => seq(
      "(",
      repeat(choice($.string, $.identifier)),
      ")"
    ),

    string: _ => /'[^']*'/
  }
});
