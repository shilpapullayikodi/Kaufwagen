import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  float: right;
  font-size: 0.4em;
`;

const UserInfo = styled.div`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  background: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  z-index: 2;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  color: black;
  &:hover {
    background: #f0f0f0;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  color: grey;
  cursor: pointer;
  padding: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

export default function UserProfile() {
  const { data: session } = useSession(); //get current session(logged in user info)
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  return (
    <Container>
      {session ? (
        <UserInfo>
          {/* Avatar with click handler to toggle dropdown */}
          {session.user.image && (
            <Avatar
              src={session.user.image}
              alt="User Avatar"
              onClick={toggleDropdown}
            />
          )}
          {dropdownVisible && (
            <Dropdown>
              <DropdownItem>{session.user.name}</DropdownItem>
              <DropdownItem onClick={() => signOut()}>Logout</DropdownItem>
            </Dropdown>
          )}
        </UserInfo>
      ) : (
        <Button onClick={() => signIn()}>Login</Button>
      )}
    </Container>
  );
}
