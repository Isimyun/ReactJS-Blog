import "./about.css"
import Header from "../../components/header/Header"

export default function About() {
	return (
		<>
			<Header /> {/*This will render the header part of the page.*/}
			<div className="sidebar">
				<div className="sidebarItem">
					<span className="sidebarTitle">ABOUT ME</span>
					<img src="https://coinnounce.com/content/images/wp-content/uploads/2019/10/pewdiepie-face.jpg" alt="pewdiepie" />
					<p className="aboutMe">
						Oh boy, where do I start? I'm just your average college student trying to finish this assignment while maintaining a socially acceptable caffeine intake. When I'm not procrastinating or stressing about deadlines, you can usually find me binge-watching Netflix or attempting to cook something that doesn't end up being a fire hazard. <br /><br/>

						I'm a master at the art of procrastination, which means I'm always up for a good meme scroll session or a quick game of "just one more level" on my favorite video game. But don't let my lackadaisical attitude fool you - I'm actually a bit of an overachiever when it comes to getting good grades (because let's be honest, that's the only thing keeping me from having a full-blown panic attack). <br /><br/>

						In short, I'm just your typical, run-of-the-mill, stressed-out college student trying to make it through the semester with my sanity intact. And if all else fails, I'll just bribe the professor with some homemade cookies. (Kidding, kidding...kind of.)
					</p>
				</div>
			</div>

		</>

	)
}