import dynamic from 'next/dynamic';
import Head from 'next/head';
import Categories from '../components/Categories';
import PostCard from '../components/PostCard';
import PostWidget from '../components/PostWidget';
import { getPosts, Post } from '../services';

const PostCardTwo = dynamic(() => import('../components/PostCard'), {
  ssr: false,
});

export default function Home({ posts }: { posts: Post[] }) {
  // console.log('first', posts);
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>CMS Blog</Head>
      <link rel="icon" href="/favicon.ico" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCardTwo key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: {
      posts,
    },
  };
}
