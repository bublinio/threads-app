'use client'
import Link from 'next/link'
import Image from 'next/image'

import { sidebarLinks } from '../../constants/index'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignOutButton, useAuth } from '@clerk/nextjs'

function LeftSidebar() {
	const router = useRouter()
	const pathname = usePathname()
	const { userId } = useAuth()
	console.log(pathname)

	return (
		<section className='custom-scrollbar leftsidebar'>
			<div className='flex w-full flex-1 flex-col gap-6 px-6'>
				{sidebarLinks.map(el => {
					const isActive =
						(pathname.includes(el.route) && el.route.length > 1) ||
						pathname === el.route

					if (el.route === '/profile') {
						el.route = `${el.route}/${userId}`
					}
					return (
						<Link
							href={el.route}
							key={el.label}
							className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
						>
							<Image src={el.imgURL} alt={el.label} width={24} height={24} />
							<p className='text-light-1 max-lg:hidden'>{el.label}</p>
						</Link>
					)
				})}
			</div>

			<div className='mt-10 px-6'>
				<SignedIn>
					<SignOutButton signOutCallback={() => router.push('/sign-in')}>
						<div className='flex cursor-pointer gap-4 p-4'>
							<Image
								src='/assets/logout.svg'
								alt='logout'
								width={24}
								height={24}
							/>
							<p className='text-light-2 max-lg:hidden'>Logout</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	)
}

export default LeftSidebar
