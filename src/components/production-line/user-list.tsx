import styled from "@emotion/styled";
import { DisplayContainerHeader } from "../landing-page/display-container-header.tsx";

const ListWrapper = styled.div`
  padding: 1rem;
`;

const User = styled.div`
  margin: 0 0 1rem;
  background: #1a1a1a;
  padding: 1rem;
  color: #ddd;
  max-width: 32rem;
  display: flex;
  align-items: center;
`;

const GreenCircle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 2rem;
  display: inline-block;
  background: #7be27b;
  margin: 0 1rem 0 0;
`;

type TUserListOptions = {
  participants: { name: string; sessionid: string }[] | null;
};
export const UserList = ({ participants }: TUserListOptions) => {
  if (!participants) return null;

  return (
    <ListWrapper>
      <DisplayContainerHeader>Participants</DisplayContainerHeader>
      {participants.map((p) => (
        <User key={p.sessionid}>
          <GreenCircle /> <div>{p.name}</div>
        </User>
      ))}
    </ListWrapper>
  );
};