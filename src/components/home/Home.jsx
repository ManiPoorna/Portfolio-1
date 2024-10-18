import { useState } from 'react';
import './home.css';
import contact from "../../assets/app-icons/contacts.svg"
import projects from "../../assets/app-icons/files.svg"
import mail from "../../assets/app-icons/mail.svg"

const Home = () => {
  const [scales, setScales] = useState(Array(7).fill(1));
  const iconsArray = [{ image: contact, tag: 'Contact' }, { image : projects, tag : 'Projects' }, { image : mail,tag :"Mail" }];
  const handleMouseMove = (e, index) => {
    const items = document.querySelectorAll('.dock li');
    const item = items[index];
    const itemRect = item.getBoundingClientRect();
    const offset = Math.abs(e.clientX - itemRect.left) / itemRect.width;

    let prev = items[index - 1] || null;
    let next = items[index + 1] || null;

    let scale = 0.6;
    resetScale();

    if (prev) {
      items[index - 1].style.setProperty('--scale', 1 + scale * Math.abs(offset - 1));
    }

    item.style.setProperty('--scale', 1 + scale);

    if (next) {
      items[index + 1].style.setProperty('--scale', 1 + scale * offset);
    }
  };

  const handleClick = (index) => {
    const newScales = [...scales];
    newScales[index] = 1.6; // Simulate loading effect
    setScales(newScales);

    // Reset the scale after animation
    setTimeout(() => {
      resetScale();
    }, 1000);
  };

  const resetScale = () => {
    const items = document.querySelectorAll('.dock li');
    items.forEach((li) => {
      li.style.setProperty('--scale', 1);
    });
    setScales(Array(7).fill(1)); // Reset scales array
  };

  return (
    <div className="glass">
      <ul className="dock" onMouseLeave={resetScale}>
        {/* {['😃', '😊', '😜', '😍', '🤩', '🥳', '🥶'].map((emoji, index) => ( */}
        {iconsArray.map((object, index) => (
          <li
            key={index}
            style={{ '--scale': scales[index] }}
            onClick={() => handleClick(index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className={scales[index] > 1 ? 'loading' : ''}
          >
            <div>
              <img src={object.image} alt="" />
            </div>
            {/* <div className="icon-name">{object.tag}</div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;