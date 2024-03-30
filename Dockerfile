# docker build --pull -t jhonatan98rios/naive-bayes-classifier-api:0.0.1 .
# docker run -d jhonatan98rios/naive-bayes-classifier-api:0.0.1
FROM oven/bun
WORKDIR /app
COPY . .
RUN bun install
CMD ["bun", "--hot", "run", "src/index.ts"]