.PHONY: dev dev-install seed studio test test-cov
lazy-dev:
	@echo "Install for localhost"
	npm install
	make lazy-seed
	make fast-dev
fast-dev:
	@echo "Running db container"
	docker-compose -f dockers/dev/compose.dev.yml up db -d
	@echo "Start app in host"
	docker-compose -f dockers/dev/compose.dev.yml down app
	npm run start:dev
prisma-generate:
	@echo "Prisma generate in container"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	docker-compose -f dockers/dev/compose.dev.yml exec app npm run prisma generate
lazy-seed:
	@echo "Running db container"
	make prisma-generate
	npm run seed_pois:dev
	npm run seed_users:dev
dev-install:
	@echo "Install for container"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	docker-compose -f dockers/dev/compose.dev.yml exec app npm install
	@echo "Install for localhost"
	npm install
dev:
	@echo "Running dev container"
	docker-compose -f dockers/dev/compose.dev.yml up --build
	@echo "Dev container is running"
seed:
	@echo "Seeding database"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	docker-compose -f dockers/dev/compose.dev.yml exec app npm run seed_pois
	docker-compose -f dockers/dev/compose.dev.yml exec app npm run seed_users
	@echo "Database seeded"
seed_pois:
	@echo "Seeding POIs"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	docker-compose -f dockers/dev/compose.dev.yml exec app npm run seed_pois
fast_seed_pois:
	@echo "Fast seeding POIs"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	docker-compose -f dockers/dev/compose.dev.yml exec app npm run fast_seed_pois
studio:
	@echo "Running studio"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	npm run studio
	@echo "Studio is running"
test:
	@echo "Running tests"
	npm run test
	@echo "Tests completed"
test-cov:
	@echo "Running tests with coverage"
	npm run test:cov
	@echo "Tests with coverage completed"
migrate-dev:
	@echo "Running migration dev"
	npm run migrate:dev
	docker-compose -f dockers/dev/compose.dev.yml exec app npm run prisma migrate dev
	@echo "Migration dev completed"
