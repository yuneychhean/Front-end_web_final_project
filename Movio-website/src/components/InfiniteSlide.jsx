function InfiniteSlide() {
  const cards = [
    "https://swank-g2a8fpehd3d5hhey.a03.azurefd.net/swank/prod-media/26622/sony392x392_6pc.jpg?width=230&mode=crop&format=webp",
    "https://swank-g2a8fpehd3d5hhey.a03.azurefd.net/swank/prod-media/272007/wb2021-392x392.jpg?width=230&mode=crop&format=webp",
    "https://swank-g2a8fpehd3d5hhey.a03.azurefd.net/swank/prod-media/40756/waltdisney392x392_6pc.jpg?width=230&mode=crop&format=webp",
    "https://swank-g2a8fpehd3d5hhey.a03.azurefd.net/swank/prod-media/284076/universal2025_392x392.png?width=230&mode=crop&format=webp"
  ];

  // Triple the content to ensure smooth looping
  const allCards = [...cards, ...cards, ...cards];

  return (
    <div className='infinity_container'>
      <div className='infinity_group'>
        {allCards.map((src, index) => (
          <div className="infinyty_card" key={index}>
            <img className="min-w-full h-20" src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default InfiniteSlide