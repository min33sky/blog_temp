import Link from 'next/link';
import React from 'react';

const categories = [
  { name: 'React', slug: 'react' },
  { name: 'Web Development', slug: 'webdev' },
];
export default function Header() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href={'/'}>
            <span>GraphCMS</span>
          </Link>
        </div>
        <div>
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-sky-500 ml-4 cursor-pointer font-semibold">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
