import { RichText } from '@graphcms/rich-text-react-renderer';
import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-tsx.min';

export default function RenderRichText({ raw }: { raw: any }) {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [raw]); // <--- run when post updates

  return (
    <RichText
      content={raw}
      renderers={{
        code_block: ({ children }) => {
          return (
            <pre className="line-numbers language-ts">
              <code className="">{children}</code>
            </pre>
          );
        },
      }}
    />
  );
}
