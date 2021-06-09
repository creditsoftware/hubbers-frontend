export const creatorBios = [
  '“If I had asked the public what they wanted, they would have said a faster horse.” Henry Ford (1863 – 1947), Founder of Ford Motor Company',
  '“The secret of change is to focus all of your energy, not on fighting the old, but building on the new.” Socrates (470-399 BC), Philosopher',
  '“The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man.” George Bernard Shaw (1856-1950), Playwright',
  '“The best way to predict the future is to create it.” Alan Kay (born 1940), Computer scientist',
  '“The definition of insanity is doing the same thing over and over again, but expecting different results.” Albert Einstein (1879 – 1955)',
  '“They always say time changes things, but you actually have to change them yourself.” Andy Warhol (1928 – 1987), Artist'
];

let index = Math.floor((Math.random() * 6) + 1);
export const creatorBio = creatorBios[index];