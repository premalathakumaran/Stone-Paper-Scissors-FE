import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import ElementComponent from "./components/ElementComponent.jsx";
import Footer from "./components/Footer.jsx";
import RulesModal from "./components/RulesModal.jsx";
import Result from "./components/Result.jsx";
import "./App.css";
import iconPaper from "./assets/icon-paper.svg";
import iconRock from "./assets/icon-rock.svg";
import iconScissors from "./assets/icon-scissors.svg";
import { winnerWidth } from "./constants.js";


export default function App() {
  const [modal, setModal] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [elementIcon, setElementIcon] = useState(null);
  const [machineElementIcon, setMachineElementIcon] = useState(null);
  const [machineTurnLoading, setmachineTurnLoading] = useState(true);
  const [showMachineChoice, setShowMachineChoice] = useState(false);
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("score");
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [screenSize, setScreenSize] = useState(winnerWidth);

  const resultGame =
    elementIcon === machineElementIcon
      ? "DRAW"
      : elementIcon === iconPaper && machineElementIcon === iconRock
      ? "YOU WIN"
      : elementIcon === iconRock && machineElementIcon === iconScissors
      ? "YOU WIN"
      : elementIcon === iconScissors && machineElementIcon === iconPaper
      ? "YOU WIN"
      : "YOU LOSE";

  useEffect(() => {
    if (showMachineChoice) {
      let updatedScore = score; // Create a copy of the score
      if (resultGame === "YOU WIN") {
        updatedScore += 1; // Update the copy
      } else if (resultGame === "YOU LOSE" && updatedScore > 0) {
        updatedScore -= 1; // Update the copy
      }

      // Set the updated score in state and localStorage
      setScore(updatedScore);
      localStorage.setItem("score", updatedScore.toString());
    }
  }, [showMachineChoice, resultGame]);

  useEffect(() => {
    if (gameStart) {
      const timeoutId = setTimeout(() => {
        setmachineTurnLoading(false);
        setShowMachineChoice(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [gameStart]);

  useEffect(() => {
    const iconList = [iconPaper, iconScissors, iconRock];
    const randomIcon = Math.floor(Math.random() * iconList.length);

    setMachineElementIcon(iconList[randomIcon]);
  }, [gameStart]);

  // efecto mediaQ
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const elementClass =
    elementIcon === iconPaper
      ? "circle border-paper"
      : elementIcon === iconPaper && resultGame === "YOU WIN"
      ? "circle winner border-paper"
      : elementIcon === iconScissors
      ? "circle border-scissors"
      : elementIcon === iconScissors && resultGame === "YOU WIN"
      ? "circle winner border-scissors"
      : elementIcon === iconRock && resultGame === "YOU WIN"
      ? "circle winner border-rock"
      : "circle border-rock";

  const machineElementClass =
    machineElementIcon === iconPaper
      ? "circle border-paper"
      : machineElementIcon === iconScissors
      ? "circle border-scissors"
      : "circle border-rock";

  const mainClassName = modal ? "main hidden" : "main";
  const modalClassName = modal ? "rules-modal" : "rules-modal hidden";

  const machineTurnClass = machineTurnLoading
    ? "machine-turn"
    : "machine-turn hidden";

  const resultButtonClass = showMachineChoice ? "result" : "result hidden";

  const auraWinnerClass =
      resultGame === "YOU WIN" && showMachineChoice ? "winner-aura" : "",
    auraLoserClass = resultGame === "YOU LOSE" ? "loser-aura" : "";

  function handleResize() {
    const width = window.innerWidth;
    setScreenSize(width);
  }

  const modalClick = () => {
    setModal(!modal);
  };

  const elementClick = (selectedElementIcon) => {
    setElementIcon(selectedElementIcon);
    setGameStart(!gameStart);
  };

  const restartClick = () => {
    setGameStart(!gameStart);
    setmachineTurnLoading(!machineTurnLoading);
    setShowMachineChoice(!showMachineChoice);
  };

  return (
    <>
      <main className={mainClassName}>
        <Header score={score} />

        {gameStart && screenSize < 1020 ? (
          <>
            <section className="game-start">
              <article className="your-choice">
                {auraWinnerClass !== "winner-aura" && (
                  <div className="separator-two"></div>
                )}
                <ElementComponent
                  iconElement={elementIcon}
                  classElement={elementClass}
                  classAura={auraWinnerClass}
                />
                {auraWinnerClass !== "winner-aura" && (
                  <div className="separator"></div>
                )}
                <p>YOU PICKED</p>
              </article>
              <article className="machine-choice">
                <div className={machineTurnClass}></div>
                {showMachineChoice && (
                  <>
                    {auraWinnerClass !== "loser-aura" && (
                      <div className="separator-two"></div>
                    )}
                    <ElementComponent
                      iconElement={machineElementIcon}
                      classElement={machineElementClass}
                      classAura={auraLoserClass}
                    />
                    {auraLoserClass !== "loser-aura" && (
                      <div className="separator"></div>
                    )}
                    <p>THE HOUSE PICKED</p>
                  </>
                )}
              </article>
            </section>

            <Result
              resultClass={resultButtonClass}
              result={resultGame}
              onRestart={restartClick}
            />
          </>
        ) : gameStart && screenSize >= 1020 ? (
          <>
            <section className="game-start">
              <article className="your-choice">
                <p>YOU PICKED</p>
                {auraWinnerClass !== "winner-aura" && (
                  <div className="separator"></div>
                )}
                <ElementComponent
                  iconElement={elementIcon}
                  classElement={elementClass}
                  classAura={auraWinnerClass}
                />
              </article>
              <Result
                resultClass={resultButtonClass}
                result={resultGame}
                onRestart={restartClick}
              />
              <article className="machine-choice">
                <div className={machineTurnClass}></div>
                {showMachineChoice && (
                  <>
                    <p>THE HOUSE PICKED</p>
                    {auraLoserClass !== "loser-aura" && (
                      <div className="separator"></div>
                    )}
                    <ElementComponent
                      iconElement={machineElementIcon}
                      classElement={machineElementClass}
                      classAura={auraLoserClass}
                    />
                  </>
                )}
              </article>
            </section>
          </>
        ) : (
          <section className="game">
            <article className="paper-and-rock">
              <ElementComponent
                onElement={() => elementClick(iconPaper)}
                iconElement={iconPaper}
                classElement={"circle border-paper"}
              />
              <ElementComponent
                onElement={() => elementClick(iconScissors)}
                iconElement={iconScissors}
                classElement={"circle border-scissors"}
              />
            </article>
            <ElementComponent
              onElement={() => elementClick(iconRock)}
              iconElement={iconRock}
              classElement={"circle border-rock"}
            />
          </section>
        )}

        <Footer onModal={modalClick} />
      </main>

      <RulesModal modalClass={modalClassName} onCloseModal={modalClick} />
      
    </>
  );
}