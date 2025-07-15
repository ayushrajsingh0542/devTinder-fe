// TypingEffect.js
import { TypeAnimation } from 'react-type-animation';

function TypingEffect() {
  return (
    <TypeAnimation
      sequence={[
        'Find your perfect dev match 💻',
        2000,
        'Code meets compatibility ❤️',
        2000,
        'Swipe. Chat. Collaborate. 🤝',
        2000,
      ]}
      wrapper="span"
      speed={50}
     className="text-pink-200 text-base sm:text-lg md:text-2xl font-medium inline-block"
      repeat={Infinity}
    />
  );
}

export default TypingEffect;
