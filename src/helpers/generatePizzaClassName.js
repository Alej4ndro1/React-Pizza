export const generatePizzaClassName = ({ i, types, activeType }) => {
  if (types.length === 1 && i === 1) {
    return 'active';
  }

  return activeType === i ? 'active' : '';
};
