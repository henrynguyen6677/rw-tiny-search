.PHONY: dev dev-install seed studio test
dev:
	@echo "Running dev container"
	docker-compose -f dockers/dev/compose.dev.yml up --build
	@echo "Dev container is running"
dev-install:
	@echo "Install for container"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	docker-compose -f dockers/dev/compose.dev.yml exec app npm install
seed:
	@echo "Seeding database"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	npm run seed_pois
	npm run seed_users
	@echo "Database seeded"
studio:
	@echo "Running studio"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	npm run studio
	@echo "Studio is running"
test:
	@echo "Running tests"
	npm run test
	@echo "Tests completed"
migrate-dev:
	@echo "Running migration dev"
	npm run migrate:dev
	@echo "Migration dev completed"
