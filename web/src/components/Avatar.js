import React from "react";
import avatar from "../assets/avatar.png";

/**
 * Avatar Component.
 * @param props
 */
const Avatar = props => {
	return <div><img src={avatar} className="img-fluid rounded-circle ml-3 avatar" alt="" /></div>
};

export default Avatar;