import React, { ReactNode, useEffect, useState } from "react";

interface GoBlinkProps {
  prefix?: string;
  suffix?: string;
  cursor?: string;
  messages: string[];
  cursorOnDuration?: number;
  cursorOffDuration?: number;
  waitBeforeTypingDuration?: number;
  typeNextCharacterDuration?: number;
  waitBeforeUntypingDuration?: number;
  untypeNextCharacterDuration?: number;
  debug?: boolean;
}

const GoBlink = ({
  prefix = "",
  suffix = "",
  cursor = "|",
  messages = [],
  cursorOnDuration = 500,
  cursorOffDuration = 500,
  waitBeforeTypingDuration = 200,
  typeNextCharacterDuration = 50,
  waitBeforeUntypingDuration = 200,
  untypeNextCharacterDuration = 50,
  debug = false,
}: GoBlinkProps) => {
  const [cursorVisibility, setCursorVisiblity] = useState<boolean>(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState<number>(0);

  /**
   * Interval for controlling cursor blink.
   */
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const makeCursorVisible = () => {
      setCursorVisiblity(true);
      timeout = setTimeout(makeCursorInvisible, cursorOnDuration);
    };

    const makeCursorInvisible = () => {
      setCursorVisiblity(false);
      timeout = setTimeout(makeCursorVisible, cursorOffDuration);
    };

    makeCursorVisible();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Only start controlling _if_ there are any messages!
  if (messages.length) {
    /**
     * Interval for controlling the text
     */
    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout>;

      const waitBeforeTyping = () => {
        // Start off by waiting until we should start typing
        timeout = setTimeout(typeNextCharacter, waitBeforeTypingDuration);
      };

      const typeNextCharacter = () => {
        // Grab the current string
        const currentString = messages[currentMessageIndex];

        setCurrentCharacterIndex((val) => {
          if (val < currentString.length) {
            timeout = setTimeout(typeNextCharacter, typeNextCharacterDuration);
            return val + 1;
          } else {
            timeout = setTimeout(waitBeforeUntyping, typeNextCharacterDuration);
            return val;
          }
        });
      };

      const waitBeforeUntyping = () => {
        timeout = setTimeout(untypeNextCharacter, waitBeforeUntypingDuration);
      };

      const untypeNextCharacter = () => {
        setCurrentCharacterIndex((val) => {
          if (val > 0) {
            timeout = setTimeout(
              untypeNextCharacter,
              untypeNextCharacterDuration
            );
            return val - 1;
          } else {
            // We've finished removing the word; we can move on to the next word!
            setCurrentMessageIndex((val) => (val + 1) % messages.length);

            // Wait until we start typing again.
            waitBeforeTyping();
            return val;
          }
        });
      };

      waitBeforeTyping();

      return () => {
        clearTimeout(timeout);
      };
    }, []);
  }

  return (
    <div>
      <span
        style={{
          position: "relative",
          display: "flex",
        }}
      >
        {messages.map((message, messageIndex) => {
          const wordVisible = currentMessageIndex === messageIndex;
          return (
            <span
              key={messageIndex}
              style={{
                visibility: wordVisible ? "visible" : "hidden",
                position: "absolute",
              }}
            >
              <span>{prefix}</span>{" "}
              {message.split("").map((char, charIndex) => {
                const charVisible =
                  wordVisible && charIndex < currentCharacterIndex;
                const lastChar = charIndex === currentCharacterIndex - 1;

                return (
                  <span
                    key={charIndex}
                    style={{
                      visibility: charVisible ? "visible" : "hidden",
                    }}
                  >
                    {char}
                    {
                      lastChar && cursor
                    }
                  </span>
                );
              })}{" "}
              <span>{suffix}</span>
            </span>
          );
        })}
      </span>
      <p>
        Statistics!<br />
        Char: {currentCharacterIndex} / {messages[currentMessageIndex].length} <br />
        String: {messages[currentMessageIndex]} {currentMessageIndex}<br/>
      </p>
    </div>
  );
};

export { GoBlink };
export type { GoBlinkProps };
