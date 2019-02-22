<template>
<div class="topic-detail">
    <Breadcrumb
        class="breadcrumb"
        >
        <BreadcrumbItem to="/subjects">知识库</BreadcrumbItem>
        <BreadcrumbItem :to="`/subject/${subjectName}`">{{ subjectName }}</BreadcrumbItem>
        <BreadcrumbItem>{{ topic.title }}</BreadcrumbItem>
    </Breadcrumb>
    <Divider></Divider>
    <div class="topic-content-wrapper">
        <div class="left">
            <div class="topic-section">
                <h1 class="title">{{ topic.title }}</h1>
                <div class="content">
                    <div class="vote-star">
                        <div class="vote-section">
                            <Button 
                                type="primary" 
                                shape="circle" 
                                icon="ios-arrow-up"
                                size="large"
                                ></Button>
                            <span class="vote-count">{{ topic.votes }}</span>
                        </div>
                        <div class="stars-section">
                            <Icon type="md-star-outline" size="20" /> 
                            <!-- <Icon type="md-star" /> -->
                            <span class="star-count">{{ topic.stars }}</span>
                        </div>
                    </div>
                    <div class="desc">
                        {{ topic.description }}
                    </div>
                </div>
            </div>
            <div class="opinions-section">
            </div>
        </div>
        <div class="right meta">
            <div class="cell-list">
                <div class="cell-item">
                    <div class="label">创建时间</div>
                    <div class="value">{{ topic.createdAt | dateFormat }}</div>
                </div>
                <div class="cell-item">
                    <div class="label">浏览次数</div>
                    <div class="value">{{ topic.views }}</div>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
export default {
    data() {
        return {
            topic: {
                id: 0,
                title: '',
                description: '',
                votes: 0,
                views: 0,
                stars: 0,
                opinions: 0,
                createdAt: null,
                updatedAt: null,
                creator: {
                    name: '',
                    email: '',
                },
                subject: {
                    name: '',
                },
            }
        }
    },
    computed: {
        topicId() {
            return this.$route.params.id
        },
        subjectName() {
            return this.topic.subject.name
        },
    },
    filters: {
        dateFormat(dateString) {
            return moment(dateString).fromNow()
        }
    },
    apollo: {
        topic: {
            query: gql`
                query queryTopic($id: Int) {
                    topic(id: $id) {
                        id
                        title
                        description
                        votes
                        views
                        stars
                        opinions
                        updatedAt
                        createdAt
                        creator {
                            name
                        }
                        subject {
                            name
                        }
                    }
                }
            `,
            variables() {
                return {
                    id: +this.topicId
                }
            }
        }
    },
}
</script>

<style lang="less" scoped>
.topic-detail {
    display: flex;
    flex-direction: column;
    height: 100%;
    .topic-content-wrapper {
        flex: 1;
        display: flex;
        height: 100%;
        .left {
            flex: 1;
        }
        .right {
            width: 360px;
            border-left: 1px solid #e8eaec;
            padding: 16px;
        }
    }
    .topic-section {
        display: flex;
        flex: 1;
        flex-direction: column;
        .title {}
        .content {
            flex: 1;
            margin-top: 16px;
            overflow: auto;
            display: flex;
            height: 100%;
            .vote-star {
                width: 36px;
                margin-right: 16px;
                .vote-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 20px;
                }
                .stars-section {
                    margin-top: 8px;
                    font-size: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            }
            .desc {
                flex: 1;
                font-size: 14px;
            }
        }
    }
    .opinions-section {
    }
}

.cell-list {
    .cell-item {
        display: flex;
        .label {
            color: #888888;
        }
        .value {
            margin-left: 16px;
        }
    }
}
</style>


