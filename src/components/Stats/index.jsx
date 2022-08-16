import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/userContext";
import ProgressBar from "../progressBar";

export default function UserStats() {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const total = user?.wins + user?.losses;
  const winPercentage = Math.floor((100 * user.wins) / total) || 0;
  return (
    <Stats>
      <span>{`${user?.username}\` statistics`}</span>
      <MainInfo>
        <div>
          <span>{total}</span>
          <span>Played</span>
        </div>
        <div>
          <span>{winPercentage}</span>
          <span>Win %</span>
        </div>
        <div>
          <span>{user.currentStreak}</span>
          <span>Current Streak</span>
        </div>
        <div>
          <span>{user.bestStreak}</span>
          <span>Best Streak</span>
        </div>
      </MainInfo>
      <span>Guess distribution</span>
      <GuessDistribution>
        <ProgressBar index="1" total={total} current={user.oneGuess} />
        <ProgressBar index="2" total={total} current={user.twoGuess} />
        <ProgressBar index="3" total={total} current={user.threeGuess} />
        <ProgressBar index="4" total={total} current={user.fourGuess} />
        <ProgressBar index="5" total={total} current={user.fiveGuess} />
        <ProgressBar index="6" total={total} current={user.sixGuess} />
      </GuessDistribution>
    </Stats>
  );
}

const Stats = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  row-gap: 5px;
  color: #fff;
  padding: 10px 0;
`;

const MainInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
  }

  & > div > span:last-child {
    font-size: 12px;
    font-weight: 300;
  }
`;

const GuessDistribution = styled.div`
  width: 100%;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 10px;
`;
