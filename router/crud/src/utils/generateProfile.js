
const names = [
  "David Davidson",
  "Billy Terry",
  "Keira Best",
  "Taylor Andrews",
  "Ernesto Hurst",
  "Anton Morse",
  "Clay Lopez",
  "Louis Pittman",
  "Ivan Bryant",
  "Elena Luna"
];

const cities = [
  { city: "Jaipur", country: "India" },
  { city: "Los Angeles", country: "United States" },
  { city: "Berlin", country: "Germany" },
  { city: "Pune", country: "India" },
  { city: "Cairo", country: "Egypt" },
  { city: "Beijing", country: "China" },
  { city: "Moscow", country: "Russia" },
  { city: "Dongguan", country: "China" },
  { city: "Jakarta", country: "Indonesia" },
  { city: "Kinshasa", country: "Democratic Republic of the Congo" }
];

/**
 * Генерация профиля пользователя
 * 
 * @returns {object} Профиль
 */
const generateProfile = () => {
  const uuid = window.crypto.randomUUID();
  return {
    id: uuid,
    avatar: "https://i.pravatar.cc/150?u=" + uuid,
    name: names[parseInt(Math.random() * 10)],
    place: cities[parseInt(Math.random() * 10)]
  };
};

export default generateProfile;