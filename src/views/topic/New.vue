<template>
<div class="subject-new">
    <Breadcrumb
        class="breadcrumb"
        >
        <BreadcrumbItem to="/subjects">知识库</BreadcrumbItem>
        <BreadcrumbItem :to="`/subject/${subjectName}`">{{ subjectName }}</BreadcrumbItem>
        <BreadcrumbItem>新建话题</BreadcrumbItem>
    </Breadcrumb>
    <Divider></Divider>
    <Form 
        :model="newTopic" 
        label-position="top"
        class="form"
        >
        <FormItem label="话题名称">
            <Input v-model="newTopic.name" />
        </FormItem>
        <FormItem label="话题描述">
            <Input 
                v-model="newTopic.description" 
                :rows="5"
                type="textarea"
                />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submitHandler">创建</Button>
        </FormItem>
    </Form>
</div>
</template>

<script>
import gql from 'graphql-tag'
import { mutate, getVueApolloErrorMessage } from '../../utils/helper.js'
export default {
    data() {
        return {
            newTopic: {
                title: '',
                description: '',
            }
        }
    },
    computed: {
        subjectName() {
            return this.$route.params.subjectName
        }
    },
    methods: {
        async submitHandler() {
            const { title, description } = this.newTopic
            const [err, res] = await mutate(this, {
                mutation: gql`
                    mutation createTopic {
                        subjectName: createTopic(title: "${title}", description: "${description}")
                    }
                `
            })
            if (err) {
                const errorMessage = getVueApolloErrorMessage(err)
                this.$Message.error(errorMessage);
                return;
            }
            this.$Message.success('创建成功')
        }
    }
}
</script>

<style lang="less" scoped>
.form {
    width: 480px;
    margin-top: 48px;
}
</style>


