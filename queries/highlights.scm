; Highlights query for kee language

; Comments
(comment) @comment

; Modifiers
(modifier) @keyword.modifier

; Keys
(key) @constant

; Namespaces
(namespace) @namespace

; Function names
(function_call
  function: (identifier) @function)

; Arguments
(string) @string
(number) @number

; Operators
"=" @operator
"::" @operator
"-" @operator

; Delimiters
"(" @punctuation.bracket
")" @punctuation.bracket
"," @punctuation.delimiter
