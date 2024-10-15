import React, { useState } from "react";

import Friend from "./Friend";
function Props() {
  const raw = [
    {
      name: "John",
      profession: "Painter",
      friend: false,
      image:
        "https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Alice",
      profession: "Artist",
      friend: false,
      image:
        "https://images.unsplash.com/photo-1541752171745-4176eee47556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Bob",
      profession: "Director",
      friend: false,
      image:
        "https://images.unsplash.com/photo-1583341612074-ccea5cd64f6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Charlie",
      profession: "SDE I",
      friend: false,
      image:
        "https://images.unsplash.com/photo-1482961674540-0b0e8363a005?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "David",
      profession: "SDE II",
      friend: false,
      image:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [realData, setRealData] = useState(raw);

  const handleFriendButton = (cardIndex) => {
    setRealData((previous) => {
      return previous.map((item, index) => {
        if (index === cardIndex) {
          return { ...item, friend: !item.friend };
        }
        return item;
      });
    });
  };

  return (
    <>
      <div className="w-full h-screen bg-zinc-300 flex gap-4 items-center justify-center">
        {realData.map((item, index) => (
          // Method 1
          // <Friend image={item.image} name={item.name} profession={item.profession} />
          // Method 2
          <Friend
            key={index}
            index={index}
            click={handleFriendButton}
            values={item}
          />
        ))}
      </div>
    </>
  );
}

export default Props;
