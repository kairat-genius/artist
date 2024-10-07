const translation = () => {
    // перевод дней
  const getDeclension = (number, singular, pluralFew, pluralMany) => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return pluralMany;
    }

    if (lastDigit === 1) {
      return singular;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return pluralFew;
    }

    return pluralMany;
  };

  // Функция для определения правильного склонения в зависимости от единицы времени
  const getTimeUnit = (value, unit) => {
    switch (unit) {
      case "days":
        return getDeclension(value, "день", "дня", "дней");
      case "weeks":
        return getDeclension(value, "неделя", "недели", "недель");
      case "months":
        return getDeclension(value, "месяц", "месяца", "месяцев");
      case "hours":
        return getDeclension(value, "час", "часа", "часов");
      case "minutes":
        return getDeclension(value, "минута", "минуты", "минут");
      default:
        return unit;
    }
  };
      return { getDeclension, getTimeUnit };
}
export default translation;
