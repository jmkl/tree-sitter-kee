export default grammar({
  name: "kee",
  extras: ($) => [/\s/, $.comment],

  conflicts: ($) => [[$.keybind, $.identifier]],

  rules: {
    source_file: ($) => repeat($.binding),

    binding: ($) =>
      seq(
        field("keybind", $.keybind),
        "=",
        field("action", $.action),
        optional("\n"),
      ),

    keybind: ($) =>
      choice(
        // Valid keybind
        seq(repeat(seq($.modifier, "-")), $.key),
        // Invalid keybind (for error recovery)
        $.identifier,
      ),

    modifier: ($) => choice("M", "C", "S", "A"),

    key: ($) =>
      choice(
        /[a-z0-9]/, // Single alphanumeric
        "up",
        "down",
        "left",
        "right",
        "pageup",
        "pagedown",
        "home",
        "end",
        "tab",
        "space",
        "return",
        "escape",
        "backspace",
        "delete",
        "kp0",
        "kp1",
        "kp2",
        "kp3",
        "kp4",
        "kp5",
        "kp6",
        "kp7",
        "kp8",
        "kp9",
        "kpreturn",
        "kpminus",
        "kpplus",
        "kpmultiply",
        "kpdivide",
        "kpdelete",
        "backquote",
        "minus",
        "equal",
        "[",
        "]",
        "\\",
        "intlbackslash",
        ";",
        "'",
        ",",
        ".",
        "/",
        /f[0-9]+/, // Function keys
      ),

    action: ($) => $.function_call,

    function_call: ($) =>
      seq(
        optional(seq(field("namespace", $.namespace), "::")),
        field("function", $.identifier),
        optional(seq("(", optional(field("arguments", $.argument_list)), ")")),
      ),

    namespace: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    argument_list: ($) => sep1($.argument, ","),

    argument: ($) =>
      choice(
        $.string,
        $.number,
        $.identifier,
        $.invalid_string, // For error recovery
      ),

    string: ($) => choice(seq("'", /[^']*/, "'"), seq('"', /[^"]*/, '"')),

    // Unclosed strings for error recovery
    invalid_string: ($) => choice(seq("'", /[^'\n)]*/), seq('"', /[^"\n)]*/)),

    number: ($) => /\d+/,

    comment: ($) => token(seq("#", /.*/)),
  },
});

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}
