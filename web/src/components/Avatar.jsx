import React from "react";
import avatar from "../assets/avatar.png";

/**
 * Avatar Component.
 * @param props
 */
const Avatar = props => {
	const src = props.src ? props.src : avatar;
	return <div><img src={props.file || src} className="img-fluid rounded-circle ml-3 avatar" alt="" /></div>
};

export default Avatar;