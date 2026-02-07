export default grammar({
  name: "kee",

  extras: ($) => [/\s/, $.comment],

  rules: {
    source_file: ($) => repeat($.binding),

    binding: ($) =>
      seq(
        field("keybind", $.keybind),
        "=",
        field("action", $.action),
        optional("\n"),
      ),

    keybind: ($) => seq(repeat(seq($.modifier, "-")), $.key),

    modifier: ($) => choice("M", "C", "S", "A"),

    key: ($) =>
      choice(
        /[a-zA-Z0-9]/, // Single alphanumeric
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

    action: ($) =>
      seq(
        field("namespace", $.namespace),
        "::",
        field("function", $.function_call),
      ),

    namespace: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    function_call: ($) =>
      choice(
        seq(
          field("name", $.identifier),
          "(",
          optional(field("args", $.argument_list)),
          ")",
        ),
        field("name", $.identifier), // For TOGGLEWINDOWLEVEL style
      ),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    argument_list: ($) => sep1($.argument, ","),

    argument: ($) => choice($.string, $.number, $.identifier),

    string: ($) => choice(seq("'", /[^']*/, "'"), seq('"', /[^"]*/, '"')),

    number: ($) => /\d+/,

    comment: ($) => token(seq("#", /.*/)),
  },
});

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}
