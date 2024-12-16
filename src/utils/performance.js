export const optimizePerformance = () => {
  // Check device capabilities
  const isLowEndDevice = () => {
    return (
      navigator.hardwareConcurrency <= 4 ||
      !window.requestAnimationFrame ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  };

  // Adjust animation settings based on device
  const getAnimationSettings = () => {
    const isLow = isLowEndDevice();
    return {
      duration: isLow ? 0.3 : 0.5,
      stagger: isLow ? 0.1 : 0.2,
      enableHeavyEffects: !isLow
    };
  };

  return {
    isLowEndDevice: isLowEndDevice(),
    animationSettings: getAnimationSettings()
  };
}; 