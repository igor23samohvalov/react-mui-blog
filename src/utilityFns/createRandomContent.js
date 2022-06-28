const names = ['Casey', 'Sandy', 'Matt', 'John', 'Kelly', 'Wandy', 'Daily'];
const titles = ['Weather', 'News', 'Blog', 'Travel', 'Daily', 'Science', 'School'];
const post = 'nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et';
const comment = 'donec adipiscing tristique risus nec feugiat in fermentum posuere urna';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const createRndPost = (id) => ({
  author: names[getRandomInt(names.length - 1)],
  title: titles[getRandomInt(titles.length - 1)],
  post,
  id,
  img: `./blog${getRandomInt(6)}.jpg`,
})

export const createRndComment = (id, postsLength) => ({
  author: names[getRandomInt(names.length -1)],
  commentText: comment,
  id,
  postId: getRandomInt(postsLength),
})