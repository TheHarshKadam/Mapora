export function getColor(distance) {
  if (distance < 200) return "#ff0000";     
  if (distance < 500) return "#ff3300";
  if (distance < 1000) return "#ff6600";
  if (distance < 2000) return "#ff9900";
  if (distance < 4000) return "#ffcc00";
  if (distance < 7000) return "#ffff66";
  return "#cccccc"; 
}