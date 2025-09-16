const fieldStyle = {
  borderColor: "lightgray",
  "&:focus": {
    borderColor: "primary",
    boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
    outline: "none",
  },
}

export default {
  label: {
    fontSize: 1,
    fontWeight: "bold",
  },
  input: fieldStyle,
  textarea: fieldStyle,
}
