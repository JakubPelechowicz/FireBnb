class MongoDatabaseRouter:
    def db_for_read(self, model, **hints):

        if model._meta.app_label == 'bnbs':
            return 'mongo'
        return None
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'bnbs':
            return 'mongo'
        return None


class MysqlDatabaseRouter:
    route_app_labels = {"auth", "contenttypes"}
    def db_for_read(self, model, **hints):

        if model._meta.app_label in self.route_app_labels:
            return 'default'
        return None
    def db_for_write(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return 'default'
        return None
