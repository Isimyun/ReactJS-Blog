import "./header.css"

export default function Header() {
	return (
		<div className='header'>
			<div className="headerTitles"> {/* This is the header title */}
				<span className="headerTitleSmall">Web Tecnology Assignment</span>
				<span className="headerTitleLarge">Blog</span>
			</div>
			<img className="headerImage" src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="headerImage" />
		</div>
	)
}
