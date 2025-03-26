import Badge from "./Badge.jsx";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function Tab({ isSelected, onSelect, badgeCaption, type, children }) {
  return (
    <li>
      <button
        className={isSelected ? "selected" : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge caption={badgeCaption}></Badge>
      </button>
      <AnimatePresence mode="wait">
        {isSelected && (
          <motion.div
            key={type}
            className="active-tab-indicator"
            transition={{ duration: 0.2 }}
            layoutId="tab-indicator"
          />
        )}
      </AnimatePresence>
    </li>
  );
}
function Task({onSelect}) {
  function handleChange(value){
    console.log(value);
    onSelect(value);
  }
  return (
    <div className="task-cont">
      <label htmlFor="task">Tasks' class:</label>
      {
        // task's classes: fitness, coding, reading, private, work
      }
      <select onChange={(e)=>handleChange(e.target.value)} name="task" id="task">
        <option value="all">All</option>
        <option value="private">Private</option>
        <option value="work">Work</option>
        <option value="fitness">Fitness</option>
        <option value="studying">Studying</option>
        <option value="coding">Coding</option>
        <option value="reading">Reading</option>
      </select>
    </div>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  onSelectClass,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs-menu">
        <ul id="tabs-ul">
          <Tab
            type="active"
            isSelected={selectedType === "active"}
            onSelect={() => onSelectType("active")}
            badgeCaption={challenges.active.length}
          >
            Active
          </Tab>
          <Tab
            type="completed"
            isSelected={selectedType === "completed"}
            onSelect={() => onSelectType("completed")}
            badgeCaption={challenges.completed.length}
          >
            Completed
          </Tab>
          <Tab
            type="failed"
            isSelected={selectedType === "failed"}
            onSelect={() => onSelectType("failed")}
            badgeCaption={challenges.failed.length}
          >
            Failed
          </Tab>
        </ul>
        <Task onSelect={onSelectClass}/>
      </menu>
      <div>{children}</div>
    </>
  );
}
