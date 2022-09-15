import React, { useEffect } from 'react';
import { Post, PostData } from '../services';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-tsx.min';

interface Props {
  post: PostData;
}

export default function PostCard({ post }: Props) {
  console.log('post: ', post);
  console.log('image: ', post.featuredImage.url);

  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [post]); // <--- run when post updates

  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img src={post.featuredImage.url} alt="" />
      </div>
      {post.title}
      {post.excerpt}
      <div>
        <h1>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</h1>
        <RichText
          content={post.content.raw}
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
      </div>
    </div>
  );
}
