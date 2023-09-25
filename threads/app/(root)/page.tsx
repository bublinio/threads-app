import ThreadCard from '@/components/cards/ThreadsCard'
import { fetchPosts } from '@/lib/actions/thread.actions'
import { currentUser } from '@clerk/nextjs'

export default async function Home() {
	const result = await fetchPosts(1, 30)
	const user = await currentUser()
	console.log(result)

	return (
		<>
			<h1 className='head-text text-left '>Home</h1>

			<section className='mt-9 flex flex-col gap-10'>
				{result.posts.length === 0 ? (
					<p className='no-result'>no threads found</p>
				) : (
					<>
						{result.posts.map(el => (
							<ThreadCard
								key={el._id}
								id={el._id}
								currentUserId={user?.id || ''}
								parentId={el.parentId}
								content={el.text}
								author={el.author}
								community={el.community}
								createdAt={el.createdAt}
								comments={el.children}
							/>
						))}
					</>
				)}
			</section>
		</>
	)
}
