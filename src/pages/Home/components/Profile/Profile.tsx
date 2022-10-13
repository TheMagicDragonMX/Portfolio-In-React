import React, { useRef } from "react"
import "./Profile.scss"

import { ProfilePicCoin } from "../ProfilePicCoin"

import facebook from "@/assets/facebook.png"
import twitter from "@/assets/twitter.png"
import github from "@/assets/github.png"
import leetcode from "@/assets/leetcode.png"
import { ImageButton, SpinningWheel, SpinningWheelElement } from "@/components"

export interface ProfileInterface {}

const Profile : React.FC<ProfileInterface> = () => {
	
	/**
	 * Determines how big the socials buttons are
	 */
	const socialsButtonsWidth = 35
	
	/**
	 * Keeps track of the socials wheel and helps
	 * when the user shows or dismisses it
	 */
	const socialMediaButtons = useRef<HTMLDivElement>(null)
	const toggleSocialMediaButtons = () => socialMediaButtons.current?.classList.toggle("showing-socials")

	/**
	 * Links that redirect the user to my socials
	 */
	const toFacebook = () => window.open("https://www.facebook.com/alejandrodavid.garciagonzalez/", "_blank")
	const toTwitter = () => window.open("https://twitter.com/MagicDragon327", "_blank")
	const toLeetCode = () => window.open("https://leetcode.com/TheMagicDragonMX327/", "_blank")
	const toGitHub = () => window.open("https://github.com/TheMagicDragonMX", "_blank")

	return (
		<div className="profile">
			<ProfilePicCoin onClick={ toggleSocialMediaButtons } />
			
			<SpinningWheel ref={ socialMediaButtons } className="socials" rotationTime={ 15 } radius={ 105 } amountOfElements={ 4 }>
				<SpinningWheelElement position={ 0 }>
					<ImageButton image={ facebook } width={ socialsButtonsWidth } onClick={ () => toFacebook() } />	
				</SpinningWheelElement>

				<SpinningWheelElement position={ 1 }>
					<ImageButton image={ twitter } width={ socialsButtonsWidth } onClick={ () => toTwitter() } />
				</SpinningWheelElement>

				<SpinningWheelElement position={ 2 }>
					<ImageButton image={ github } width={ socialsButtonsWidth } onClick={ () => toGitHub() } />
				</SpinningWheelElement>

				<SpinningWheelElement position={ 3 }>
					<ImageButton image={ leetcode } width={ socialsButtonsWidth } onClick={ () => toLeetCode() } />
				</SpinningWheelElement>
			</SpinningWheel>
		</div>
	)
}

export default Profile
