import { useSelector } from "react-redux"
import './index.css'

export default function Profile () {
    const user = useSelector(state => state.session.user)

    return (
        <div className="profile-main-wrapper" style={{"margin":"40px", "padding":"0px 10px", "display":"flex", "flexDirection":"column", "border":"lightGray solid 1px", "borderRadius":"10px"}}>
            <h1 style={{"borderBottom":"solid lightgray 1px", "padding":"0px 10px 10px 0px"}}>Your Profile:</h1>
            <div style={{"display":"flex", "flexDirection":"column"}}>
                <div>
                    Name: {user.firstName}
                </div>
                <div>
                    Last Name: {user.lastName}
                </div>
                <div>
                    Username: {user.username}
                </div>
                <div>
                    Email: {user.email}
                </div>
            </div>
        </div>
    )
}
