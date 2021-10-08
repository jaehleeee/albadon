import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.rolling.RollingFileAppender
import ch.qos.logback.core.rolling.TimeBasedRollingPolicy

import static ch.qos.logback.classic.Level.DEBUG
import static ch.qos.logback.classic.Level.INFO

def MAIN_LOG_DIR = "."
def rollingMaxHistory = 60

//appender("CONSOLE", ConsoleAppender) {
//    encoder(PatternLayoutEncoder) {
//        Pattern = "%d %level %thread %mdc %logger.%M\\(%line\\) - %m%n"
//    }
//}
//root(INFO, ["CONSOLE"])

appender("ROLLING", RollingFileAppender) {
    encoder(PatternLayoutEncoder) {
        Pattern = "%d %level %thread %mdc %logger.%M\\(%line\\) - %m%n"
    }
    rollingPolicy(TimeBasedRollingPolicy) {
        FileNamePattern = "${MAIN_LOG_DIR}/logs/logback-%d{yyyy-MM-dd}.log.gz"
        MaxHistory = rollingMaxHistory
    }
}

root(INFO, ["ROLLING"])
logger("org.springframework.web.client", DEBUG, ["ROLLING"], false)
