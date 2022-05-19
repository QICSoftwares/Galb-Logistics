import {followers} from './followers.js';
import {followings} from './followings.js';
followers.map((m, index) => {
  if (followers[index].includes('g')) {
    console.log(followers[index]);
  }
});
