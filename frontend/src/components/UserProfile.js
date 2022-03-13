import {Container} from "react-bootstrap";

const UserProfile = () => {

    const currentUser = undefined

    return(
        <Container>
            <h1>{currentUser.username}'s Profile</h1>
            <h3>Adatok:</h3>
            <div>
                Ide az adatok....
            </div>
        </Container>
    )

}
export default UserProfile