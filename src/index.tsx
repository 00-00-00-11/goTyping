import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Timer } from "./Timer";

interface GoTypingProps {
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

const GoTyping = ({
  prefix = "",
  suffix = "",
  cursor = "|",
  messages = [],
  cursorOnDuration = 500,
  cursorOffDuration = 500,
  waitBeforeTypingDuration = 200,
  typeNextCharacterDuration = 50,
  waitBeforeErasingDuration = 200,
  eraseNextCharacterDuration = 50,
}: GoTypingProps) => {
  const [cursorVisibility, setCursorVisiblity] = useState<boolean>(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState<number>(0);
  const [boundingBoxHeight, setBoundingBoxHeight] = useState<number>(0);
  const messageRefs = useRef<HTMLSpanElement[] | null[]>([]);

  /**
   * Event loop for controlling the cursor blink, as well as the
   * animation loop for controlling the height of the element,
   * by calculating the max height of the "messages"
   */
  useEffect(() => {
    const timer = new Timer();
    let animationFrame: ReturnType<typeof requestAnimationFrame>;

    const eventLoop = async () => {
      try {
        while (true) {
          await timer.wait(cursorOnDuration);
          setCursorVisiblity(false);
          await timer.wait(cursorOffDuration);
          setCursorVisiblity(true);
        }
      } catch {
        // Cancelled!
      }
    };

    const animationLoop = () => {
      let maxHeight = 0;

      for (const ref of messageRefs.current.values()) {
        if (ref) {
          const height = ref.getBoundingClientRect().height;
          if (height > maxHeight) maxHeight = height;
        }
      }

      setBoundingBoxHeight(maxHeight);

      animationFrame = requestAnimationFrame(animationLoop);
    };

    eventLoop();
    animationLoop();

    return () => {
      timer.cancelAll();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  /**
   * Event loop for controlling the characters appearing/disappearing
   */
  useEffect(() => {
    const timer = new Timer();

    const eventLoop = async () => {
      let mi = 0;
      let ci = 0;

      try {
        while (true) {
          for (mi = 0; mi < messages.length; mi++) {
            setCurrentMessageIndex(mi);

            await timer.wait(waitBeforeTypingDuration);

            for (ci = 0; ci <= messages[mi].length; ci++) {
              await timer.wait(typeNextCharacterDuration);
              setCurrentCharacterIndex(ci);
            }

            await timer.wait(waitBeforeErasingDuration);

            for (ci = messages[mi].length; ci >= 0; ci--) {
              await timer.wait(eraseNextCharacterDuration);
              setCurrentCharacterIndex(ci);
            }
          }
        }
      } catch {
        // Cancelled!
      }
    };

    eventLoop();

    return () => {
      timer.cancelAll();
    };
  }, [messages]);

  return (
    <div
      style={{
        height: `${boundingBoxHeight}px`,
      }}
    >
      <span
        style={{
          position: "relative",
          display: "flex",
        }}
      >
        {messages.map((message, messageIndex) => {
          const wordVisible = currentMessageIndex === messageIndex;

          // Turn all the characters into a span
          const characters: ReactNode[] = message
            .split("")
            .map((char, charIndex) => (
              <span
                key={charIndex}
                style={{
                  visibility:
                    wordVisible && charIndex < currentCharacterIndex
                      ? undefined
                      : "hidden",
                }}
              >
                {char}
              </span>
            ));

          // Insert a cursor is we're on the current word
          if (wordVisible) {
            // Insert the cursor and suffix into the correct position,
            // deleting 0 characters in the process
            characters.splice(
              currentCharacterIndex,
              0,
              <span
                key="cursor"
                style={{
                  visibility: cursorVisibility ? undefined : "hidden",
                }}
              >
                {cursor}
              </span>,
              suffix && <span> {suffix}</span>
            );
          }

          return (
            <span
              key={messageIndex}
              ref={(el) => (messageRefs.current[messageIndex] = el)}
              style={{
                visibility: wordVisible ? undefined : "hidden",
                position: "absolute",
              }}
            >
              {prefix && <span>{prefix}</span>} {characters}
            </span>
          );
        })}
      </span>
    </div>
  );
};

export { GoTyping, GoTyping as GoBlink };
export type { GoTypingProps };
