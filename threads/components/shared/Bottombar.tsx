'use client'
import Link from 'next/link'
import Image from 'next/image'

import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

function Bottombar() {
	const pathname = usePathname()

	return (
		<section className='bottombar'>
			<div className='bottombar_container'>
				{sidebarLinks.map(el => {
					const isActive =
						(pathname.includes(el.route) && el.route.length > 1) ||
						pathname === el.route

					return (
						<Link
							href={el.route}
							key={el.label}
							className={`bottombar_link ${isActive && 'bg-primary-500'}`}
						>
							<Image src={el.imgURL} alt={el.label} width={24} height={24} />
							<p className='text-light-1 text-subtle-medium max-sm:hidden'>
								{el.label.split(/\s+/)[0]}
							</p>
						</Link>
					)
				})}
			</div>
		</section>
	)
}

export default Bottombar
