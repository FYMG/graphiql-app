const applyVariables = (
  text: string,
  userVariables: { key: string; value: string }[]
): string => {
  let result = text;

  userVariables.forEach(({ key, value }) => {
    const regex = new RegExp(`{{${key}}}`, 'g');

    result = result.replace(regex, value);
  });

  return result;
};

export default applyVariables;
