.PHONY:
dev:
	@echo "Running dev container"
	docker-compose -f dockers/dev/compose.dev.yml up --build
	@echo "Dev container is running"
dev-install:
	@echo "Install for container"
	docker-compose -f dockers/dev/compose.dev.yml exec app npm install
seed:
	@echo "Seeding database"
	docker-compose -f dockers/dev/compose.dev.yml up -d
	npm run seed
	@echo "Database seeded"
