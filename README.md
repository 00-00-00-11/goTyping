# goTyping

A ReactJS component for generating typing animations, by goSystem Solutions Limited.

## Motivation

goTyping preempts and sets the maximum size of the component, to ensure that the entire message fits within the component, and does not cause the component to enlarge/overflow at any point.

## Installation

Install the `gotyping` module, with `yarn add gotyping` or `npm i --save gotyping`.

## Usage

```tsx
<GoBlink prefix="Welcome to" messages={[
  "the house of fun",
  "the United Kingdom",
  "Greggs",
  "Crossrail, also known as the Elizabeth Line",
]} />
```

## Props

```ts
interface GoBlinkProps {
  /**
   * The string that appears before each of the messages
   * @default "" The prefix
   */
  prefix?: string;

  /**
   * The string that appears after the message, and also the cursor
   * @default "" The suffix
   */
  suffix?: string;

  /**
   * The character(s) that represents the blinking cursor
   * @default "|" The cursor string
   */
  cursor?: string;

  /**
   * An array of strings for each of the messages
   * @default [] The array of strings
   */
  messages: string[];

  /**
   * The duration of time, in milliseconds that the cursor should be visible for
   * @default 500
   */
  cursorOnDuration?: number;

  /**
   * The duration of time, in milliseconds that the cursor should be invisible for
   * @default 500
   */
  cursorOffDuration?: number;

  /**
   * The duration of time, in milliseconds that should elapse, while there is no text
   * displayed, before the typing animation begins
   * @default 200
   */
  waitBeforeTypingDuration?: number;

  /**
   * The duration of time, in milliseconds that should elapse, for each character to be typed
   * @default 50
   */
  typeNextCharacterDuration?: number;

  /**
   * The duration of time, in milliseconds that should elapse, while the text is
   * displayed, before the untyping/erasing animation begins
   * @default 200
   */
  waitBeforeErasingDuration?: number;

  /**
   * The duration of time, in milliseconds that should elapse, for each character to be untyped/erased
   * @default 50
   */
  eraseNextCharacterDuration?: number;
}
```


## Licencing

This project is licenced for use under the MIT Licence.
