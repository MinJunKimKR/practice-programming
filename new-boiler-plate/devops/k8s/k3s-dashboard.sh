
RELATIVE_DIR=`dirname "$BASH_SOURCE"`
cd $RELATIVE_DIR
K3D_PATH=`pwd -P`

kubectl apply -f "$K3D_PATH/dashboard/dashboard-admin.yaml"
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta8/aio/deploy/recommended.yaml
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
#access to http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/