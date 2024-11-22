document.addEventListener("DOMContentLoaded", () => {
  const circles = [
    document.getElementById("circle1"),
    document.getElementById("circle2"),
    document.getElementById("circle3"),
    document.getElementById("circle4"),
  ];

  const arrows = [
    document.getElementById("arrow1"),
    document.getElementById("arrow2"),
    document.getElementById("arrow3"),
    document.getElementById("arrow4"),
  ];

  const resetButton = document.getElementById("resetButton");

  // Move the arrow to the circle and stop before hitting it
  const moveArrowToCircle = (arrow, circle) => {
    const circleRect = circle.getBoundingClientRect();
    const arrowRect = arrow.getBoundingClientRect();

    const circleCenterX = circleRect.left + circleRect.width / 2;
    const circleCenterY = circleRect.top + circleRect.height / 2;
    const arrowX = arrowRect.left + arrowRect.width / 2;
    const arrowY = arrowRect.top + arrowRect.height / 2;

    // Calculate the distance and angle
    const displacementX = circleCenterX - arrowX;
    const displacementY = circleCenterY - arrowY;
    const angle = Math.atan2(displacementY, displacementX);

    // Start animation
    let distance = Math.sqrt(displacementX * displacementX + displacementY * displacementY);
    const speed = 2; // Speed at which the arrow moves

    const interval = setInterval(() => {
      if (distance > 60) {
        // Stop before hitting the circle
        // Update arrow's position
        arrow.style.left = `${arrow.offsetLeft + Math.cos(angle) * speed}px`;
        arrow.style.top = `${arrow.offsetTop + Math.sin(angle) * speed}px`;
        distance -= speed;
      } else {
        clearInterval(interval);
        disableCircleColor(circle); // Change the color of the circle
      }
    }, 16);
  };

  // Function to change circle color 
  function disableCircleColor(circle) {
    circle.style.backgroundColor = "#d3d3d3"; // Light gray color to signify disabled state
  }

  // Reset the app to its initial state
  resetButton.addEventListener("click", () => {
    resetArrows();
    resetCircleColor();
  });

  // Reset arrow positions and rotation
  const resetArrows = () => {
    arrows.forEach((arrow, index) => {
      // Reset arrows to their initial positions
      const initialPositions = [
        { left: "82%", top: "120px" },
        { left: "82%", top: "220px" },
        { left: "82%", top: "320px" },
        { left: "82%", top: "420px" },
      ];

      arrow.style.left = initialPositions[index].left;
      arrow.style.top = initialPositions[index].top;
    });
  };

  // Reset circle colors
  const resetCircleColor = () => {
    circles.forEach((circle, index) => {
      const colors = ["red", "green", "blue", "orange"];
      circle.style.backgroundColor = colors[index]; // Reset circle to original colors
    });
  };

  // When you click an arrow, animate it towards the corresponding circle
  arrows.forEach((arrow, index) => {
    arrow.addEventListener("click", () => {
      moveArrowToCircle(arrow, circles[index]);
    });
  });
});
