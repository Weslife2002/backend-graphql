module.exports = {
  Post: {
    clapCount: ({ _id }, _, { dataSource }, __) => {
      dataSource.Clap.clapCount();
    },
  },
};
