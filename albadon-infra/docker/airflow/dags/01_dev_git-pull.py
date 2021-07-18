from datetime import timedelta

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.dummy import DummyOperator
from airflow.utils.dates import days_ago

args = {
    'owner': 'jaybe.park',
}

with DAG(
    dag_id='01_dev_git-pull',
    default_args=args,
    schedule_interval=None,
    start_date=days_ago(2),
    dagrun_timeout=timedelta(minutes=60),
    tags=['jaybe.park', 'dev', 'git-pull'],\
) as dag:

    start = DummyOperator(
        task_id='start',
    )

    end = DummyOperator(
        task_id='end',
    )

    git_pull = BashOperator(
        task_id='git_pull',
        bash_command='echo git-pull',
    )

    start >> git_pull >> end